import { WhereOptions } from 'sequelize'
import { Attributes, IncludeOptions, Order } from 'sequelize/types/model'

interface RepositoryWriter<IT, RT> {
  create(input: Partial<IT>, include?: IncludeOptions): Promise<RT>
  bulkCreate(input: Partial<IT[]>): Promise<RT[]>
  updateOne({
    id,
    input,
    include,
  }: {
    id: number
    input: Partial<IT>
    include: IncludeOptions[]
  }): Promise<[number]>
  updateMany({
    where,
    input,
  }: {
    where: object
    input: Partial<IT>
  }): Promise<[number]>
  deleteOne(id: number): Promise<number>
  deleteMany({ where }: { where: object }): Promise<number>
  restore(id: number): Promise<number>
}

interface RepositoryReader<RT> {
  findAll({
    where,
    attributes,
    include,
    order,
  }: {
    where?: WhereOptions<any>
    attributes?: Attributes<any>
    include?: IncludeOptions[]
    order?: Order
  }): Promise<RT[]>
  findOne({
    where,
    attributes,
    include,
    order,
  }: {
    where?: WhereOptions<any>
    attributes?: Attributes<any>
    include?: IncludeOptions[]
    order?: Order
  }): Promise<RT>
  findByPk(
    id: number,
    options?: {
      attributes?: Attributes<any>
      include?: IncludeOptions[]
    }
  ): Promise<RT>
  findAndCountAll({
    where,
    include,
    attributes,
    offset,
    limit,
    distinct,
    group,
    order,
  }: {
    where?: WhereOptions<any>
    include?: IncludeOptions[]
    attributes?: Attributes<any>
    offset?: number
    limit?: number
    distinct?: boolean,
    group?: string[];
    order?: Order
  }): Promise<{ count: number; rows: RT[] }>
}

export abstract class BaseRepository<IT, RT>
  implements RepositoryWriter<IT, RT>, RepositoryReader<RT>
{
  constructor(public readonly model: any) {}

  findAll({
    where,
    attributes,
    include,
    order,
    group,
    limit
  }: {
    where?: WhereOptions<any>
    attributes?: Attributes<any>
    include?: IncludeOptions[]
    order?: Order
    group?: string[],
    limit?: number
  }): Promise<RT[]> {
    return this.model.findAll({ where, attributes, include, order,group, limit })
  }


  findOne({
    where,
    attributes,
    include,
    order,
  }: {
    where?: WhereOptions<any>
    attributes?: Attributes<any>
    include?: IncludeOptions[]
    order?: Order
  }): Promise<RT> {
    return this.model.findOne({ where, attributes, include, order })
  }

  findByPk(
    id: number,
    options?: {
      attributes?: Attributes<any>
      include?: IncludeOptions[]
    }
  ): Promise<RT> {
    return this.model.findByPk(id, options)
  }

  findAndCountAll({
    where,
    include,
    attributes,
    offset,
    limit,
    distinct,
    group,
    order
}: {
    where?: WhereOptions<any>
    attributes?: Attributes<any>
    include?: IncludeOptions[]
    offset?: number
    limit?: number
    distinct?: boolean
    group?: string[]
    order?: Order
}): Promise<{ count: number; rows: RT[] }> {
    return this.model.findAndCountAll({
        where,
        include,
        attributes,
        offset,
        limit,
        distinct,
        group,
        order,
    });
}


  create(input: Partial<IT>, include?: IncludeOptions): Promise<RT> {
    return this.model.create(input, include)
  }

  updateOne({
    id,
    input,
  }: {
    id: number
    input: Partial<IT>
  }): Promise<[number]> {
    return this.model.update(input, { where: { id } })
  }

  bulkCreate(input: Partial<IT[]>): Promise<RT[]> {
    return this.model.bulkCreate(input, { returning: true })
  }

  updateMany({
    where,
    input,
  }: {
    where: object
    input: Partial<IT>
  }): Promise<[number]> {
    return this.model.update(input, { where })
  }

  deleteOne(id: number): Promise<number> {
    return this.model.destroy({
      where: { id },
    })
  }

  deleteMany({ where }: { where: object }): Promise<number> {
    return this.model.destroy({
      where,
    })
  }

  restore(id: number): Promise<number> {
    return this.model.restore({
      where: { id },
    })
  }
}
