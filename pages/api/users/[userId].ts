import type { NextApiRequest, NextApiResponse } from 'next';
import httpStatus from 'http-status';
import User from '../../../services/user.services';
import catchAPIError from '../../../lib/catchApiError';
import ApiError from '../../../lib/ApiError';
import connectToDatabase from '../../../lib/database';

export default catchAPIError(async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { db } = await connectToDatabase();
    const UserCollection = new User(db);
    const { userId } = req.query;

    if (typeof userId !== 'string') throw new ApiError(httpStatus.BAD_REQUEST, 'User ID is invalid');

    if (req.method === 'PATCH') {
        const doc = await UserCollection.update(userId, req.body);
        res.status(httpStatus.OK).json({ doc: doc.value });
    }
    else if (req.method === 'GET') {
        const doc = await UserCollection.findById(userId);
        res.status(httpStatus.OK).json({ doc });
    }
    else if (req.method === 'DELETE') {
        await UserCollection.deleteUser(userId);
        res.status(httpStatus.NO_CONTENT).end();
    }
    else {
        res.status(httpStatus.NOT_FOUND);
    }
})
