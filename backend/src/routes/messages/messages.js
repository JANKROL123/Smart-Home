const messages = {
    EXISTS: {type: "success", msg: "COMPONENT_EXISTS"},
    DOES_NOT_EXIST: {type: "error", msg: "COMPONENT_DOES_NOT_EXIST"},
    BAD_REQUEST: {type: "error", msg: "BAD_REQUEST"},
    ALREADY_EXISTS: {type: "error", msg: "COMPONENT_ALREADY_EXISTS"},
    INCORRECT: {type: "error", msg: "INCORRECT_DATA"},
    CREATED: {type: "success", msg: "COMPONENT_CREATED"},
    STARTED: {type: "success", msg: "COMPONENT_STARTED"},
    STOPPED: {type: "success", msg: "COMPONENT_STOPPED"},
    DELETED: {type: "success", msg: "COMPONENT_DELETED"},
    UPDATED: {type: "success", msg: "COMPONENT_UPDATED"},
}
module.exports = messages;