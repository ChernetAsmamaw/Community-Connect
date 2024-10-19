import { m } from "framer-motion";
import { request, gql } from "graphql-request";

const MASTER_URL =
  "https://eu-west-2.cdn.hygraph.com/content/" +
  process.env.NEXT_PUBLIC_MATER_URL_KEY +
  "/master";

/********** Fetching all categories **********/
const getCategory = async () => {
  const query = gql`
    query MyQuery {
      categories {
        bgColor {
          hex
        }
        name
        id
        icon {
          url
        }
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

/********** Fetching all businesses **********/
const getAllBusinessList = async () => {
  const query = gql`
    query FetchAllBusinesses {
      businessLists {
        about
        address
        category {
          name
        }
        contactPerson
        email
        id
        images {
          url
        }
        name
        updatedAt
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

/********** Fetching all businesses by category **********/
const getBusinessByCategory = async (category) => {
  const query =
    gql`
    query FetchBussinessByCategory {
      businessLists(where: { category: { name: "` +
    category +
    `" } }) {
        about
        address
        contactPerson
        email
        id
        images {
          url
        }
        name
        category {
          name
        }
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

/********** Retrieving business by ID **********/
const getBusinessById = async (id) => {
  const query =
    gql`
    query FetchBusinessDetail {
  businessList(where: {id: "` +
    id +
    `"}) {
    about
    address
    contactPerson
    category {
      name
    }
    id
    name
    email
    images {
      url
    }
  }
}`;

  const result = await request(MASTER_URL, query);
  return result;
};

/************** Creating a new booking **************/
const createBooking = async (businessId, date, time, userEmail, userName) => {
  const mutationQuery =
    gql`
    mutation CreateBooking {
      createBooking(
        data: {
          bookingStatus: booked
          businessList: { connect: { id: "` +
    businessId +
    `" } }
          date: "` +
    date +
    `"
          time: "` +
    time +
    `"
          userEmail: "` +
    userEmail +
    `"
          userName: "` +
    userName +
    `"
        }
      ) {
        id
      }
      publishManyBookings(to: PUBLISHED) {
      count
      }
    }
  `;

  const result = await request(MASTER_URL, mutationQuery);
  return result;
};

/************ Booked Slots ************/
const getBookedSlots = async (businessId, date) => {
  const query =
    gql`
    query BusinessBookedSlots {
      bookings(where: { businessList: { id: "` +
    businessId +
    `" }, date: "` +
    date +
    `" }) {
        date
        time
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

/************ Get the Booking History by Email ************/
const getBookingHistory = async (userEmail) => {
  const query =
    gql`
    query FetchUserBookingHistory {
      bookings(where: { userEmail: "` +
    userEmail +
    `" }
    orderBy: publishedAt_DESC
    ) {
        businessList {
          address
          contactPerson
          name
          id
          email
          images {
            url
          }
        }
        date
        time
        bookingStatus
      }
      publishManyBusinessLists(to: PUBLISHED) {
    count
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

/************** Create Business **************/
const createBusiness = async (data) => {
  const { about, address, category, contactPerson, email, images, name } = data;

  const imagesInput = images.create
    .map((img) => `{ uploadUrl: "${img.url}" }`) // Properly format each image object
    .join(", "); // Join them into a single string

  const mutationQuery = gql`
    mutation CreateBusiness {
      createBusinessList(
        data: {
          about: "${about}"
          address: "${address}"
          category: { connect: { id: "${category.connect.id}" } }
          contactPerson: "${contactPerson}"
          email: "${email}"
          name: "${name}"
          images: { create: { uploadUrl: "${images.create[0].url}" } }
        }
      ) {
        id
      }
      publishManyBusinessLists(to: PUBLISHED) {
        count
      }
    }
  `;

  const result = await request(MASTER_URL, mutationQuery);
  return result;
};

const publishImages = async (businessId, imageUrls) => {
  // Assuming imageUrls contains objects with a property that can be used to identify the images
  const imageIds = imageUrls.map((img) => img.id); // Ensure img.id corresponds to the actual ID property

  // Construct the mutation query
  const mutationQuery = gql`
    mutation PublishImages {
      publishManyAssets(
        to: PUBLISHED
        locales: en
        where: { imagesBusinessList_every: { id_in: [${imageIds
          .map((id) => `"${id}"`)
          .join(", ")}] } }
      ) {
        count
      }
    }
  `;

  // Execute the mutation
  const result = await request(MASTER_URL, mutationQuery);
  console.log("Published Images Response:", result);
};

export default {
  getCategory,
  getAllBusinessList,
  getBusinessByCategory,
  getBusinessById,
  createBooking,
  getBookedSlots,
  getBookingHistory,
  createBusiness,
  publishImages,
};
