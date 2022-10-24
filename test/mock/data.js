const register={
"teacher": "shashiguru@gmail.com",
  "students":
    [
      "suneel@gmail.com",
      "vetri@gmail.com",
      "sumanth@gmail.com"
    ]
}

const commonStudentsRequest="teacher=teacherken%40gmail.com&teacher=teacherjoe%40gmail.com";

const commonStudentsResponse={
    "students": [
        "guru@gmail.com"
    ]
}

const suspend={
    "student" : "sumanth@gmail.com"
  }

  const notificationsRequest={
    "teacher":  "shashiguru@gmail.com",
    "notification": "Hey everybody @guru@gmail.com"
  }

  const notificationsResponse={
    "recipients": [
        "guru@gmail.com",
        "suneel@gmail.com",
        "vetri@gmail.com"
    ]
}

module.exports={
    register,
    commonStudentsRequest,
    commonStudentsResponse,
    suspend,
    notificationsRequest,
    notificationsResponse
}