import normalizr from 'normalizr'
import { readFile, writeFile } from "fs/promises";

const empresa = JSON.parse(
    await readFile(
        new URL("./empresa2.json", import.meta.url)
    )
) 



const puestoSchema = new normalizr.schema.Entity('puesto')

const areaSchema = new normalizr.schema.Entity('area');

const empleadoSchema = new normalizr.schema.Entity('empleados', {
    puesto: puestoSchema,
    area: areaSchema
})

const empresaSchema = new normalizr.schema.Entity('empresa', {
    empleados: [empleadoSchema]
})

const normalizedEmpresa = normalizr.normalize(empresa, empresaSchema);

const denormalizedEmpresa = normalizr.denormalize(normalizedEmpresa.result, empresaSchema, normalizedEmpresa.entities);

await writeFile('./empresaNormalized2.json', JSON.stringify(normalizedEmpresa, null, 2))
 .then(_ => console.log('ok'))

// await writeFile('./empresadeNormalized.json', JSON.stringify(denormalizedEmpresa, null, 2))
//  .then(_ => console.log('ok'))
