import BasicTableOne from "../../../components/tables/BasicTables/BasicTableOne";

export default function Childers() {
  const admin = [
    {
      id: 1,
      name: "mohamed",
      email: "mohamed@gmail.com",
      LastRegister: "5/7/16",
      Children: "(3) Ahmed , Mona , seif ",
    },
    {
      id: 2,
      name: "mohamed",
      email: "mohamed@gmail.com",
      LastRegister: "5/7/16",
      Children: "(3) Ahmed , Mona , seif ",
    },
    {
      id: 3,
      name: "mohamed",
      email: "mohamed@gmail.com",
      LastRegister: "5/7/16",
      Children: "(3) Ahmed , Mona , seif ",
    },
    {
      id: 4,
      name: "mohamed",
      email: "mohamed@gmail.com",
      LastRegister: "5/7/16",
      Children: "(3) Ahmed , Mona , seif ",
    },
    {
      id: 5,
      name: "mohamed",
      email: "mohamed@gmail.com",
      LastRegister: "5/7/16",
      Children: "(3) Ahmed , Mona , seif ",
    },
  ];

  const columns = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "email",
      label: "email",
    },
    {
      key: "LastRegister",
      label: "Last Register",
    },
    {
      key: "Children",
      label: "Children",
    },
    {
      key: "actions",
      label: "Actions",
      render: (row: any) => (
        <div className="flex justify-center items-center gap-2">
          {/* Edit Button */}
          <button onClick={() => console.log("Edit", row)}>
            <img
              src="/src/icons/Edit.svg"
              alt="edit"
              className="w-8 h-8 object-cover"
            />
          </button>

          {/* Delete Button */}
          <button onClick={() => console.log("Delete", row)}>
            <img
              src="/src/icons/Remove.svg"
              alt="remove"
              className="w-9 h-9 object-cover"
            />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <BasicTableOne data={admin} columns={columns} />{" "}
    </div>
  );
}
