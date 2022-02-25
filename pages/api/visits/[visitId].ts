import type { NextApiRequest, NextApiResponse } from 'next';
import httpStatus from 'http-status';
import PageVisit from '../../../services/pageVisits.services';
import { client } from '../../../lib/mongodb';
import catchAPIError from '../../../lib/catchAPIError';
import ApiError from '../../../lib/ApiError';
import { ObjectId } from 'bson';

export default catchAPIError(async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const PageVisitCollection = new PageVisit(client);
    await PageVisit.build();
    const { visitId } = req.query;

    if (typeof visitId !== 'string') throw new ApiError(httpStatus.BAD_REQUEST,'ID is invalid');

    if (req.method === 'PATCH') {
        const doc = await PageVisitCollection.update(new ObjectId(visitId), req.body);
        res.status(httpStatus.OK).json({ doc: doc.value });
    }
    else if (req.method === 'GET') {
        const doc = await PageVisitCollection.findById(new ObjectId(visitId));
        res.status(httpStatus.OK).json({ results: doc });
    }
    else if (req.method === 'DELETE') {
        await PageVisitCollection.deletePageVisit(new ObjectId(visitId));
        res.status(httpStatus.NO_CONTENT);
    }
    else {
        res.status(httpStatus.NOT_FOUND);
    }
})