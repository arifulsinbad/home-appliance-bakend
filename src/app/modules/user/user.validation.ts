import { z } from 'zod';

const create = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    role: z
      .enum(['admin', 'user', 'super_admin'] as [string, ...string[]], {
        required_error: 'Role is required',
      })
      .optional(),
    gender: z
      .enum(['male', 'female', 'others'] as [string, ...string[]], {
        required_error: 'Gender is required',
      })
      .optional(),
    contactNo: z.string({
      required_error: ' Contact No is required',
    }),
    dateOfBirth: z.string({
      required_error: ' Date of birth is required',
    }),
    address: z.string({
      required_error: ' Address is required',
    }),
    profileImg: z
      .string({
        required_error: ' Profile Img is required',
      })
      .optional(),
  }),
});

export const UserValidation = {
  create,
};
