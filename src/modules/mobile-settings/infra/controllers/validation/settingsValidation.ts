import { z } from "zod";
import { MobileSetting } from '../../../domain/models/index';

export function validateNewMobileSetting(newSetting: MobileSetting) {

    const newMobileSettingSchema = z.object({
        clientId: z.number(),
        deliveryMethods: z.array(z.object({
          name: z.string(),
          enum: z.string(),
          order: z.number(),
          isDefault: z.boolean(),
          selected: z.boolean(),
        })),
        fulfillmentFormat: z.object({
          rfid: z.boolean(),
          print: z.boolean(),
        }),
        printer: z.object({
          id: z.string().nullable(),
        }),
        printingFormat: z.object({
          formatA: z.boolean(),
          formatB: z.boolean(),
        }),
        scanning: z.object({
          scanManually: z.boolean(),
          scanWhenComplete: z.boolean(),
        }),
        paymentMethods: z.object({
          cash: z.boolean(),
          creditCard: z.boolean(),
          comp: z.boolean(),
        }),
        ticketDisplay: z.object({
          leftInAllotment: z.boolean(),
        }),
        customerInfo: z.object({
          active: z.boolean(),
          basicInfo: z.boolean(),
          addressInfo: z.boolean(),
        }),
    });

    const result = newMobileSettingSchema.safeParse(newSetting);

    if (!result.success) {
        throw new Error(result.error.message)
    }

    return result.data;
}
