export const paginate = async (model, page = 1, limit = 100, include = {}) => {
    const offset = (page - 1) * limit;
    const [total, items] = await Promise.all([
        model.count(),  // Para obtener el total de elementos
        model.findMany({
            skip: offset,
            take: limit,
            include: include
        })
    ]);

    return {
        items,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
    };
};