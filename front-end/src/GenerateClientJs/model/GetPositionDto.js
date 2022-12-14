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
 * The GetPositionDto model module.
 * @module model/GetPositionDto
 * @version v1
 */
export class GetPositionDto {
  /**
   * Constructs a new <code>GetPositionDto</code>.
   * @alias module:model/GetPositionDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>GetPositionDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GetPositionDto} obj Optional instance to populate.
   * @return {module:model/GetPositionDto} The populated <code>GetPositionDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new GetPositionDto();
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('description'))
        obj.description = ApiClient.convertToType(data['description'], 'String');
    }
    return obj;
  }
}

/**
 * @member {String} name
 */
GetPositionDto.prototype.name = undefined;

/**
 * @member {String} description
 */
GetPositionDto.prototype.description = undefined;

