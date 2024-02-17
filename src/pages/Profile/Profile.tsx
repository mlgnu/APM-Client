import { useForm } from '@mantine/form';
import { NumberInput, TextInput, Button, Box, Select } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../utils/UserContext';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import { useQueryClient } from '@tanstack/react-query';

export function Profile(props: any) {
  const user = useContext(UserContext);
  const userFirstName: string = user?.data?.firstName;
  const userLastName: string = user?.data?.lastName;
  const userEmail: string = user?.data?.userEmail;
  const userDepartment: string = user?.data?.department;
  const queryClient = useQueryClient();

  // useEffect(() => {
  //   props.setActiveIndex(props.activeIndex);
  // }, []);

  //console.log(props);
  console.log(user);
  console.log('from user context: profile');
  const form = useForm({
    initialValues: {
      firstName: userFirstName,
      lastName: '',
      email: '',
      department: '',
    },

    validate: {
      firstName: (value) =>
        value.length < 3 ? 'First name must have at least 3 letters' : null,
      lastName: (value) =>
        value.length < 2 ? 'Last name must have at least 2 letters' : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      department: (value) =>
        value.length < 1 ? 'You must select a department' : null,
    },
  });

  const mutateUser = useMutation({
    mutationFn: (user: object) =>
      axios.post('http://localhost:3001/api/profile/update', { ...user }),
    onSuccess: () => {
      notifications.show({
        title: 'Profile Updated',
        message: 'Profile has been updated',
        autoClose: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  function saveUser(userForm: any) {
    console.log(user);
    console.log('...');
    mutateUser.mutate({
      ...userForm,
      id: user?.data.id,
    });
  }

  useEffect(() => {
    form.setValues({
      firstName: userFirstName,
      email: userEmail,
      department: userDepartment,
      lastName: userLastName,
    });
  }, [user]);

  return (
    <Box>
      <form
        onSubmit={form.onSubmit((values) => {
          props.close();
          saveUser(values);
        })}
      >
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            maxWidth: '500px',
          }}
        >
          <Box>
            <TextInput
              label="First Name"
              placeholder="Name"
              {...form.getInputProps('firstName')}
            />
            <TextInput
              label="Last Name"
              placeholder="Name"
              {...form.getInputProps('lastName')}
            />
          </Box>

          <Box>
            <TextInput
              label="Email"
              disabled
              placeholder="Email"
              {...form.getInputProps('email')}
            />
            <Select
              label="Department"
              placeholder="Pick value"
              data={[
                'Computer System and Network',
                'Artificial Intelligence',
                'Information Systems',
                'Data Science',
                'Software Engineering',
                'Multimedia Computing',
              ]}
              {...form.getInputProps('department')}
            />
          </Box>
        </Box>
        <Button type="submit" mt="md" style={{ width: '500px' }}>
          Update
        </Button>
      </form>
    </Box>
  );
}
