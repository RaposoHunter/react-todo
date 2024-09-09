import fs from 'fs';
import path from 'path';

class Command
{
    static flags = {};

    /**
     * @param {{action?: ?string, param: string, flags?: ?object}} options
     * @returns
     */
    static run(options)
    {
        if(!options.action) {
            return new this(options.param, options.flags);
        }

        const instance = new this();

        /** @type {Function} */
        const method = instance[options.action];

        if(!method) {
            console.error("\x1b[31mCommand not found\x1b[0m");
            process.exit(1);
        }

        Command.flags = options.flags;

        return method.call(instance, options.param, options.flags);
    }

    /**
     * @param {string} param
     */
    static normalize(param)
    {
        param = param.replace(/\./g, '');
        path.win32.normalize(param);

        param = param.replace(/^(\\|\/)+|(\\|\/)+$/g, '');

        return {
            dirname: path.dirname(param),
            basename: path.basename(param)
        };
    }

    /**
     * @param {string} param
     */
    static createDirectory(directory)
    {
        if(!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }
    }

    /**
     * @param {string} filepath
     */
    static haltIfExists(filepath)
    {
        if(fs.existsSync(filepath) && !Command.flags.force && !Command.flags.f) {
            console.error("\x1b[31mFile already exists\x1b[0m");
            process.exit(1);
        }
    }
}

export default Command;
