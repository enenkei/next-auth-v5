import { getVerificationTokenByEmail } from '@/data/verification-token';
import {v4 as uuid} from 'uuid';
import { db } from './db';
import moment from 'moment';
import { getPasswordResetTokenbyEmail } from '@/data/password-reset-token';
export const generateVerificationToken = async(email : string) => {
    const token = uuid();
    const expires =  moment(new Date()).add(1, "hours").toISOString();
    const existingToken = await getVerificationTokenByEmail(email);
    if(existingToken){
        await db.verificationToken.delete({
            where : {
                id : existingToken.id
            }
        });
    }
    const verificationToken = await db.verificationToken.create({
        data : {
            email,
            token,
            expires
        }
    });
    return verificationToken;
}

export const generatePasswordResetToken = async(email : string) => {
    const token = uuid();
    const expires =  moment(new Date()).add(1, "hours").toISOString();
    const existingToken = await getPasswordResetTokenbyEmail(email);
    if(existingToken){
        await db.passwordResetToken.delete({
            where : {
                id : existingToken.id
            }
        });
    }
    const passwordToken = await db.passwordResetToken.create({
        data : {
            email,
            token,
            expires
        }
    });
    return passwordToken;
}