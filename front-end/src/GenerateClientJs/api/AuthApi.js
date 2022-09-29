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
import { ApiClient } from "../ApiClient";

/**
* Auth service.
* @module api/AuthApi
* @version v1
*/
export class AuthApi {
  /**
    * Constructs a new AuthApi. 
    * @alias module:api/AuthApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
  constructor(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;
  }

  /**
     * Callback function to receive the result of the apiAuthPost operation.
     * @callback moduleapi/AuthApi~apiAuthPostCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

  /**
     * @param {Object} opts Optional parameters
     * @param {module:model/AuthDto} opts.body 
     * @param {module:api/AuthApi~apiAuthPostCallback} callback The callback function, accepting three arguments: error, data, response
     */
  apiAuthPost(
    opts,
    callbackRequest,
    callback,
    setErrorMess,
    setOpenErrorAlert
  ) {
    opts = opts || {};
    let postBody = opts["body"];

    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};

    let authNames = [];
    let contentTypes = ["application/json", "text/json", "application/_*+json"];
    let accepts = [];
    let returnType = null;

    return this.apiClient.callApi(
      "/api/Auth",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callbackRequest,
      callback,
      setErrorMess,
      setOpenErrorAlert
    );
  }
}
