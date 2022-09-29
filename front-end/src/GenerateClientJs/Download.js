import axios from "axios";
import fileDownload from "js-file-download";

export default function download(props) {
  axios
    .get("https://localhost:44358/api/Report", {
      responseType: "blob"
    })
    .then(res => {
      if (res === undefined) {
        props.setErrorMess("Error:Server is not available");
      } else if (res.status === 400) {
        props.setErrorMess(res.body.error);
      } else if (res.status === 403) {
        props.setErrorMess("Error:Forbidden");
      } else if (res.status === 401) {
        props.setErrorMess("Error:Unauthorized");
      } else if (res.status === 200) {
        fileDownload(res.data, "report.xlsx");
        return;
      } else if (res.status === 500) {
        props.setErrorMess(res.text);
      } else {
        props.setErrorMess(res.body.error);
      }
      props.setOpenErrorAlert(true);
    });
}
