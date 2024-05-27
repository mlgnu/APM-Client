import { useForm } from "@mantine/form";
import { NumberInput, TextInput, Button, Box, Select } from "@mantine/core";
import { UserContext, useUserContext } from "../../utils/UserContext";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { useProfileContext } from "../../utils/ProfileContext";
import apiClient from "../../utils/apiClient";

type ProfileProps = {
  role: number;
  close: () => void;
};

export function Profile({ role, close }: ProfileProps) {
  const user = useUserContext();
  const profile = useProfileContext();
  // const userFirstName: string = user.firstName;
  // const userLastName: string = user?.data?.lastName;
  const queryClient = useQueryClient();

  // useEffect(() => {
  //   props.setActiveIndex(props.activeIndex);
  // }, []);

  //console.log(props);
  console.log(profile, "profile");
  const form = useForm({
    initialValues: {
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      email: user?.userEmail || "",
      department: profile.department || "",
    },

    validate: {
      firstName: (value) =>
        value.length < 3 ? "First name must have at least 3 letters" : null,
      lastName: (value) =>
        value.length < 2 ? "Last name must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      department: (value) =>
        value.length < 1 ? "You must select a department" : null,
    },
  });

  const mutateUser = useMutation({
    mutationFn: (user: object) =>
      apiClient.post("/profile/update", { ...user }),
    onSuccess: () => {
      notifications.show({
        title: "Profile Updated",
        message: "Profile has been updated",
        autoClose: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  function saveUser(userForm: any) {
    console.log(user);
    mutateUser.mutate({
      userEmail: user.userEmail,
      firstName: userForm.firstName,
      lastName: userForm.lastName,
      department: userForm.department,
      id: user.id.toString(),
    });
  }

  // useEffect(() => {
  //   form.setValues({
  //     firstName: profile?.firstName || "",
  //     email: userEmail,
  //     department: userDepartment,
  //     lastName: userLastName,
  //   });
  // }, [user]);

  return (
    <Box>
      <form
        onSubmit={form.onSubmit((values) => {
          close();
          saveUser(values);
        })}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            maxWidth: "500px",
          }}
        >
          <Box>
            <TextInput
              label="First Name"
              placeholder="Name"
              {...form.getInputProps("firstName")}
            />
            <TextInput
              label="Last Name"
              placeholder="Name"
              {...form.getInputProps("lastName")}
            />
          </Box>

          <Box>
            <TextInput
              label="Email"
              disabled
              placeholder="Email"
              {...form.getInputProps("email")}
            />
            <Select
              label="Department"
              placeholder="Pick value"
              data={[
                "Computer System and Network",
                "Artificial Intelligence",
                "Information Systems",
                "Data Science",
                "Software Engineering",
                "Multimedia Computing",
              ]}
              {...form.getInputProps("department")}
            />
          </Box>
        </Box>
        <Button type="submit" mt="md" style={{ width: "500px" }}>
          Update
        </Button>
      </form>
    </Box>
  );
}
