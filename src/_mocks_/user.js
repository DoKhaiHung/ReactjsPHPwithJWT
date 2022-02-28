import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';
import { useGetUsers } from 'src/hooks';
import { useNavigate } from 'react-router-dom';
// ----------------------------------------------------------------------
const users = ()=>{
  const navigate=useNavigate()
  const data=useGetUsers()
  if (data!= null && data.status==0) {
    navigate('/login')
  }
  const res=[...Array(24)].map((_, index) =>{
    return {
      id: (data&&data[index])?data[index].id:faker.datatype.uuid(),
      avatarUrl: mockImgAvatar(index + 1),
      name: (data&&data[index])?data[index].name:faker.name.findName(),
      company: faker.company.companyName(),
      isVerified: faker.datatype.boolean(),
      status: sample(['active', 'banned']),
      role: sample([
        'Leader',
        'Hr Manager',
        'UI Designer',
        'UX Designer',
        'UI/UX Designer',
        'Project Manager',
        'Backend Developer',
        'Full Stack Designer',
        'Front End Developer',
        'Full Stack Developer'
      ])
    }
  } );
  return res
} 
export default users;
