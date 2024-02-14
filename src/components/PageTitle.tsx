"use client";
import { cn } from '@/lib/utils';
import * as React from 'react';

interface Props {
    title: string;
    className?: string;
}

const PageTitle = ({
    title,
    className
}: Props) => {
        return (
        <h1 className={cn("text-2xl font-semibold", className)}>
            {title}
        </h1>
    );
}
 
export default PageTitle;




// /////////////////////////////////////////////////////

// import { cn } from '@/lib/utils';
// import * as React from 'react';

// interface Props {
//     title: string;
//     className?: string;
// };

// export default function PageTitle ({title, className}: Props) {
//     return (
//         <h1 className={cn("text-2xl font-semibold", className)}>
//             {title}
//         </h1>
//     );
// }
