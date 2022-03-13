import moment from "moment";

export const parseDate = (timestamp) => {
  if(typeof timestamp==="string"){
    return moment(Number(timestamp)).format("YYYY年MM月DD日 HH:mm")
  }
  return moment(timestamp).format("YYYY年MM月DD日 HH:mm")
}