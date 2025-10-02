import React from 'react'
import { Timestamp } from '../../pb/google/protobuf/timestamp'

export const convertTimestampToDate = (timestamp: Timestamp | undefined) => {
    const date = new Date(Number(timestamp?.seconds) * 1000);
    
    setMemberSince(date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }));
}
