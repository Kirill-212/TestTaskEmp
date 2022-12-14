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
 * The GetRoleDto model module.
 * @module model/GetRoleDto
 * @version v1
 */
export class GetRoleDto {
  /**
   * Constructs a new <code>GetRoleDto</code>.
   * @alias module:model/GetRoleDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>GetRoleDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GetRoleDto} obj Optional instance to populate.
   * @return {module:model/GetRoleDto} The populated <code>GetRoleDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new GetRoleDto();
      if (data.hasOwnProperty('roleName'))
        obj.roleName = ApiClient.convertToType(data['roleName'], 'String');
    }
    return obj;
  }
}

/**
 * @member {String} roleName
 */
GetRoleDto.prototype.roleName = undefined;

