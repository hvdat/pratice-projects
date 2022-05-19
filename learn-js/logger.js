export const TYPE_LOG = "log";
export const TYPE_WARN = "warn";
export const TYPE_ERROR = "error";

const logger = (msg, type = TYPE_LOG) => {
  console[type](msg);
};

export default logger;
