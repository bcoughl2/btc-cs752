montageDefine("168b017","mousse",{dependencies:["./serialization/serializer","./deserialization/deserializer"],factory:function(require,exports,module){var serializer = require("./serialization/serializer"),
    deserializer = require("./deserialization/deserializer");

exports.Serializer = serializer.Serializer;
exports.serialize = serializer.serialize;

exports.Deserializer = deserializer.Deserializer;
exports.deserialize = deserializer.deserialize;

}})