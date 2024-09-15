import { Request } from 'express';
import { Repository, getRepository } from 'typeorm';
import { BaseNotification } from '../entity/BaseNotification';


export abstract class BaseController<T> extends BaseNotification {

  private _repository: Repository<T>;
  private _onlyRootController: boolean = false;
  public errorRoot: any = {
    status: 401,
    errors: ['Você não está autorizado a executar esta funcionalidade']
  }
  
  constructor(entity: any, onlyRoot: boolean = false) {
    super();
    this._repository = getRepository<T>(entity);
    this._onlyRootController = onlyRoot;
  }

  public checkNotPermission(request: Request){
    return (this._onlyRootController && !request.isRoot);
  }

  async all(request: Request) {
    if(this.checkNotPermission(request)){ return this.errorRoot;}
    return await this._repository.find();
  }

  async one(request: Request) {
    if(this.checkNotPermission(request)){ return this.errorRoot;}
    return await this._repository.findOneBy(request.params.uid);
  }

  async save(model: any, request: Request, ignorePermissions:boolean = false) {
    if(!ignorePermissions)
    if(this.checkNotPermission(request)){ return this.errorRoot;}
    if (model.uid) {

      delete model ['deleted'];
      delete model ['updateAt'];
      delete model ['createdAt'];
      
      let _modelInDB = await this._repository.findOneById(model.uid);
      if (_modelInDB) {
        Object.assign(_modelInDB, model);
      }
    }

    if (this.valid())
      return await  this._repository.save(model);
    else
      return {
        status: 400,
        errors: this.allNotifications
      }
  }

  async remove(request: Request) {
    if(this.checkNotPermission(request)){ return this.errorRoot;}
    let id = request.params.id;
  
    let model : any = await this._repository.findOneById(id);
    
    if (model) {
      model.deleted = true;
      return this._repository.save(model);
    } else {
      return {
        status: 404,
          errors: ['Item não encontrado no banco de dados']
      }
    }
    
  }

  get repostitory(): Repository<T> {
    return this._repository;
  }

}