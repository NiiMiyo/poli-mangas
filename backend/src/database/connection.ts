import { createConnection } from "typeorm";

import ConnectionProperties from "../../ormconfig";

createConnection(ConnectionProperties);
