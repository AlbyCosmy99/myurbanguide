export const newIncludes = async (includes) => {
    if (!Array.isArray(includes) || includes.length === 0) {
        throw new Error("La lista degli includes è vuota o non valida");
    }

    const includeIds = await Promise.all(
        includes.map(async (title) => {
            const existingInclude = await IncludesModel.findOne({ title });
            if (existingInclude) {
                return existingInclude._id;
            }
            const newInclude = new IncludesModel({ title });
            await newInclude.save();
            return newInclude._id;
        })
    );
    return includeIds;
};

export const newExcludes = async (excludes) => {
    if (!Array.isArray(excludes) || excludes.length === 0) {
        throw new Error("La lista degli excludes è vuota o non valida");
    }

    const excludeIds = await Promise.all(
        excludes.map(async (title) => {
            const existingExclude = await ExcludesModel.findOne({ title });
            if (existingExclude) {
                return existingExclude._id;
            }
            const newExclude = new ExcludesModel({ title });
            await newExclude.save();
            return newExclude._id;
        })
    );
    return excludeIds;
};
