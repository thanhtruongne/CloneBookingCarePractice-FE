export const adminMenu = [
  {
    //Quản lý User
    name: "menu.admin.manager-user",
    menus: [
      {
        name: "menu.admin.CRUD-User",
        link: "/system/user-manage",
      },
      {
        name: "menu.admin.CRUD-Redux",
        link: "/system/user-redux",
      },
      {
        name: "menu.admin.manager-doctor",
        link: "/system/manage-doctor",
        // subMenus: [
        //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
        //     { name: 'menu.system.system-administrator.product-manage', link: '/system/user-redux' },

        // ]
      },
      {
        name: "menu.admin.manager-admin",
        link: "/system/user-admin",
      },
      {
        name: "menu.admin.doctor_schedule",
        link: "/doctor/doctor-schedule",
      },
    ],
  },
  {
    //Quản lý Phòng khám
    name: "menu.admin.Clinic",
    menus: [
      {
        name: "menu.admin.manager-clinic",
        link: "/system/manager-clinic",
      },
    ],
  },
  {
    //Quản lý Chuyên Khoa
    name: "menu.admin.Specialist",
    menus: [
      {
        name: "menu.admin.manager-specialist",
        link: "/system/manager-specialist",
      },
    ],
  },
  {
    //Quản lý Cẫm nang
    name: "menu.admin.Handbook",
    menus: [
      {
        name: "menu.admin.manager-handbook",
        link: "/system/manager-handbook",
      },
    ],
  },
];

export const doctorMenu = [
  {
    name: "menu.admin.manager-user",
    menus: [
      {
        //lịch trình bác sĩ
        name: "menu.doctor.doctor_schedule",
        link: "/doctor/doctor-schedule",
      },
      {
        //lịch trình bệnh nhân
        name: "menu.doctor.doctor_patient",
        link: "/doctor/patient-schedule",
      },
    ],
  },
];
