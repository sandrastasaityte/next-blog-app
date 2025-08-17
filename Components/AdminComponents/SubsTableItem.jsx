import React from 'react'

const SubsTableItem = ({email,mongoId,deleteEmail,date}) => {
    const emaildate = new date(date);
    return (
        <tr className='bg-white border-b text-left'>
            <th scope='row className='px-6 py-4 text-gray-900 whitespace>
            {email?email:"No email"}
            </th>
            <td className='px-6 py-4 hidden sm: block'>{emaildate.toDateString}</td>
            <td className='px-6 py-4 cursor-pointer' onClick={()=>deleteEmail(mongoId)}>x</td>


        </tr>

    )


}
export default SubsTableItem