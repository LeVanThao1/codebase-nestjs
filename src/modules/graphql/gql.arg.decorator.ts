import { SetMetadata } from '@nestjs/common'

export const GQLArgAtleast = (...args: string[]) => SetMetadata('args', args)
