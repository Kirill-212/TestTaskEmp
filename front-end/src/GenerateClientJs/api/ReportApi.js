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
* Report service.
* @module api/ReportApi
* @version v1
*/
export class ReportApi {
  /**
    * Constructs a new ReportApi. 
    * @alias module:api/ReportApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
  constructor(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;
  }

  /**
     * Callback function to receive the result of the apiReportGet operation.
     * @callback moduleapi/ReportApi~apiReportGetCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

  /**
     * @param {module:api/ReportApi~apiReportGetCallback} callback The callback function, accepting three arguments: error, data, response
     */
  apiReportGet(
    opts,
    callbackRequest,
    callback,
    setErrorMess,
    setOpenErrorAlert
  ) {
    let postBody = null;

    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};

    let authNames = [];
    let contentTypes = [];
    let accepts = [];
    let returnType = null;

    return this.apiClient.callApi(
      "/api/Report",
      "GET",
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