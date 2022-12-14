/*
 * BackEnd
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 3.0.35
 *
 * Do not edit the class manually.
 *
 */
import {ApiClient} from '../ApiClient';

/**
 * The PostRoleDto model module.
 * @module model/PostRoleDto
 * @version v1
 */
export class PostRoleDto {
  /**
   * Constructs a new <code>PostRoleDto</code>.
   * @alias module:model/PostRoleDto
   * @class
   * @param roleName {String} 
   */
  constructor(roleName) {
    this.roleName = roleName;
  }

  /**
   * Constructs a <code>PostRoleDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PostRoleDto} obj Optional instance to populate.
   * @return {module:model/PostRoleDto} The populated <code>PostRoleDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new PostRoleDto();
      if (data.hasOwnProperty('roleName'))
        obj.roleName = ApiClient.convertToType(data['roleName'], 'String');
    }
    return obj;
  }
}

/**
 * @member {String} roleName
 */
PostRoleDto.prototype.roleName = undefined;

