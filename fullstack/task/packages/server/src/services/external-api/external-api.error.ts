import {NotFoundException} from "@nestjs/common";

export class ExternalApiNotFoundError extends NotFoundException {
    constructor() {
        super('Exchange rate data not found from external API. Please try later')
    }
}
