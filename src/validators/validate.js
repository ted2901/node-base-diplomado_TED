function validate(schema, target = 'body') {
    return (req, res, next) => {

        const data = req[target];
        //paso 1
        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ error: 'No se enviaron datos' });
        }
        //paso 2
        const { error, value } = schema.validate(data, {
            abortEarly: false,
            stripUnknown: true
        });

        //paso 3
        if (error) {
            return res.status(400).json({
                message: `Error de validacion en ${target}`,
                error: error.details[0].message
            });
        }
        req[target] = value;
        next();
    };
}

export default validate