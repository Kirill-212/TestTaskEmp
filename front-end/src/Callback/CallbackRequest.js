export default function CallbackRequest(
  error,
  data,
  response,
  Callback,
  setErrorMess,
  setOpenErrorAlert
) {
  if (response === undefined) {
    setErrorMess("Error:Server is not available");
  } else if (response.statusCode === 400) {
    if (response.body.errors !== undefined) {
      let errorResult = [];
      let errorsJson = response.body.errors;
      for (let key in response.body.errors) {
        errorResult.push(<>{errorsJson[key]} <br></br> </>);
      }
      setErrorMess(errorResult);
    } else {
      setErrorMess(response.body.error);
    }
  } else if (response.statusCode === 403) {
    setErrorMess("Error:Forbidden");
  } else if (response.statusCode === 401) {
    setErrorMess("Error:Unauthorized");
  } else if (response.statusCode === 200 || response.statusCode === 204) {
   Callback(data,response)
   return
  }else if(response.statusCode === 500){
    setErrorMess(response.text)
  } else {
    setErrorMess(response.body.error);
  }
  setOpenErrorAlert(true)
}

