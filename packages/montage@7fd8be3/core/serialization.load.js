montageDefine("7fd8be3","core/serialization",{dependencies:["./serialization/serializer/montage-serializer","./serialization/deserializer/montage-deserializer"],factory:function(require,exports,module){var Serializer = require("./serialization/serializer/montage-serializer").MontageSerializer,
    serialize = require("./serialization/serializer/montage-serializer").serialize,
    Deserializer = require("./serialization/deserializer/montage-deserializer").MontageDeserializer,
    deserialize = require("./serialization/deserializer/montage-deserializer").deserialize;

exports.Serializer = Serializer;
exports.serialize = serialize;

exports.Deserializer = Deserializer;
exports.deserialize = deserialize;
}})