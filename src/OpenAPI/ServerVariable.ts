import {SerializableInterface} from "../Serializer/SerializableInterface";
import {SafeEditableInterface} from "./SafeEditableInterface";

export interface ServerVariableInterface {
    default: string;

    description?: string;

    enum?: string[];
}

/**
 * An object representing a Server Variable for server URL template substitution.
 *
 * @see https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#server-variable-object
 */
export class ServerVariable implements ServerVariableInterface, SerializableInterface, SafeEditableInterface {
    constructor(properties: ServerVariableInterface) {
        Object.assign(this, properties);
    }

    /**
     * **REQUIRED**. The default value to use for substitution, which SHALL be sent if an alternate value is _not_ supplied. Note this behavior is different than the [Schema Object's](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#schemaObject) treatment of default values, because in those cases parameter values are optional.
     */
    public default: string;

    /**
     * An optional description for the server variable. [CommonMark syntax](http://spec.commonmark.org/) MAY be used for rich text representation.
     */
    public description?: string;

    /**
     * An enumeration of string values to be used if the substitution options are from a limited set.
     */
    public enum?: string[];

    /**
     * @inheritDoc
     */
    public cloneAndEdit<T>(callback: (object: T) => void): T {
        const copy = require("deepcopy")(this);

        callback(copy);

        return copy;
    }

    /**
     * @inheritDoc
     */
    public serialize(): { [p: string]: any } {
        const result = {} as { [p: string]: any };

        if (this.default !== undefined) {
            result.default = this.default;
        }

        if (this.description !== undefined) {
            result.description = this.description;
        }

        if (this.enum !== undefined) {
            result.enum = this.enum;
        }

        return result;
    }
}
