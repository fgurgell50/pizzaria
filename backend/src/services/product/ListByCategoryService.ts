import prismaClient from "../../prisma";

interface ProcuctRequest{
    category_id: string
}

class ListByCategoryService {
    async execute({ category_id }: ProcuctRequest ){

        const findByCategory = await prismaClient.product.findMany({
            where:{
                category_id: category_id,
            }
        })
        return findByCategory
    }
}
export {
    ListByCategoryService
}