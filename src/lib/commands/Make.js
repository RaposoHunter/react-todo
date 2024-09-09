import { writeFileSync } from "fs";

import Command from "../Command.js";
import path from "path";

class Make extends Command
{
    static EXTENSION = 'tsx';

    page(param, flags)
    {
        const BASE_DIR = 'src/pages';

        const {dirname, basename} = Make.normalize(param);

        const filepath = dirname === '.'
            ? `${BASE_DIR}/${basename}.${Make.EXTENSION}`
            : `${BASE_DIR}/${dirname}/${basename}.${Make.EXTENSION}`;

        Make.createDirectory(`${BASE_DIR}/${dirname}`);
        Make.haltIfExists(filepath);

        try {
            writeFileSync(filepath,
`import styles from './${basename}.module.css';

export default function ${basename}()
{
    return (
        <div>${basename}</div>
    )
}
`);

            console.log(`\x1b[32mPage created successfully\x1b[0m`);
        } catch(e) {
            console.error("\x1b[31mError creating page\x1b[0m");
            process.exit(1);
        }

        try {
            writeFileSync(`${path.dirname(filepath)}/${basename}.module.css`, '');

            console.log(`\x1b[32mCSS Module created successfully\x1b[0m`);
        } catch(e) {
            console.error("\x1b[31mError creating CSS Module\x1b[0m");
            process.exit(1);
        }
    }

    component(param, flags)
    {
        const BASE_DIR = 'src/components';

        const {dirname, basename} = Make.normalize(param);

        const filepath = dirname === '.'
            ? `${BASE_DIR}/${basename}.${Make.EXTENSION}`
            : `${BASE_DIR}/${dirname}/${basename}.${Make.EXTENSION}`;

        Make.createDirectory(`${BASE_DIR}/${dirname}`);
        Make.haltIfExists(filepath);

        try {
            writeFileSync(filepath,
`export default function ${basename}()
{
    return (
        <>
            { /* ... */ }
        </>
    )
}
`);

            console.log(`\x1b[32mComponent created successfully\x1b[0m`);
        } catch(e) {
            console.error("\x1b[31mError creating component\x1b[0m");
            process.exit(1);
        }
    }

    hook(param, flags)
    {

    }
}

export default Make;