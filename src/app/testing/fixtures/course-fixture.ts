import { Course } from '../../models/course';

export class CourseFixture {
  getOakmont(): Course {
    return new Course().fromJson(
      {
        "id": 1,
        "name": "Oakmont",
        "number_of_holes": 18,
        "slope": 134,
        "rating": 74,
        "holes": [
          {
            "id": 1,
            "course": 1,
            "hole_number": 1,
            "par": 4,
            "handicap": 3
          },
          {
            "id": 2,
            "course": 1,
            "hole_number": 2,
            "par": 4,
            "handicap": 7
          },
          {
            "id": 3,
            "course": 1,
            "hole_number": 3,
            "par": 4,
            "handicap": 1
          },
          {
            "id": 4,
            "course": 1,
            "hole_number": 4,
            "par": 5,
            "handicap": 13
          },
          {
            "id": 5,
            "course": 1,
            "hole_number": 5,
            "par": 4,
            "handicap": 11
          },
          {
            "id": 6,
            "course": 1,
            "hole_number": 6,
            "par": 3,
            "handicap": 17
          },
          {
            "id": 7,
            "course": 1,
            "hole_number": 7,
            "par": 4,
            "handicap": 9
          },
          {
            "id": 8,
            "course": 1,
            "hole_number": 8,
            "par": 3,
            "handicap": 5
          },
          {
            "id": 9,
            "course": 1,
            "hole_number": 9,
            "par": 4,
            "handicap": 15
          },
          {
            "id": 10,
            "course": 1,
            "hole_number": 10,
            "par": 4,
            "handicap": 4
          },
          {
            "id": 11,
            "course": 1,
            "hole_number": 11,
            "par": 4,
            "handicap": 10
          },
          {
            "id": 12,
            "course": 1,
            "hole_number": 12,
            "par": 5,
            "handicap": 2
          },
          {
            "id": 13,
            "course": 1,
            "hole_number": 13,
            "par": 3,
            "handicap": 16
          },
          {
            "id": 14,
            "course": 1,
            "hole_number": 14,
            "par": 4,
            "handicap": 18
          },
          {
            "id": 15,
            "course": 1,
            "hole_number": 15,
            "par": 4,
            "handicap": 8
          },
          {
            "id": 16,
            "course": 1,
            "hole_number": 16,
            "par": 3,
            "handicap": 12
          },
          {
            "id": 17,
            "course": 1,
            "hole_number": 17,
            "par": 4,
            "handicap": 14
          },
          {
            "id": 18,
            "course": 1,
            "hole_number": 18,
            "par": 4,
            "handicap": 6
          }
        ]
      }
    )
  }
}

