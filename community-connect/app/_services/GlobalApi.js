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
    `" }, orderBy: publishedAt_DESC) {
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
          images: { create: { uploadUrl: [${imagesInput}] } }
        }
      ) {
        id
        images {
          id
        }
      }
      publishManyBusinessLists(to: PUBLISHED) {
        count
      }
    }
  `;

  const result = await request(MASTER_URL, mutationQuery);
  return result;
};

/************** Publish Images **************/
const publishImages = async (businessId, imageIds) => {
  const mutationQuery = gql`
    mutation PublishImages {
      publishManyAssets(
        to: PUBLISHED
        where: { id_in: [${imageIds.map((id) => `"${id}"`).join(", ")}] }
      ) {
        count
      }
    }
  `;

  // Execute the mutation
  const result = await request(MASTER_URL, mutationQuery);
  console.log("Published Images Response:", result);
};

const sendMessage = async (senderEmail, receiverEmail, text) => {
  const mutation = gql`
    mutation CreateMessage {
      createMessage(
        data: {
          createdAt: "${new Date().toISOString()}",
          senderEmail: "${senderEmail}",
          receiverEmail: "${receiverEmail}",
          text: "${text}"
        }
      ) {
        id
        createdAt
        senderEmail
        receiverEmail
        text
      }
    }
  `;

  const result = await request(MASTER_URL, mutation);
  return result.createMessage;
};

// Function to get messages between two users
const getMessagesByEmail = async (senderEmail, receiverEmail) => {
  const query = gql`
    query FetchMessages {
      messages(
        where: {
          OR: [
            { senderEmail: "${senderEmail}", receiverEmail: "${receiverEmail}" },
            { senderEmail: "${receiverEmail}", receiverEmail: "${senderEmail}" }
          ]
        },
        orderBy: createdAt_DESC
      ) {
        id
        createdAt
        senderEmail
        receiverEmail
        text
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result.messages;
};

export const getReviews = async (businessId) => {
  const query = gql`
    query GetReviews {
      reviews(orderBy: publishedAt_DESC, where: { businessList: { id: "${businessId}" } }) {
        rating
        review
        userFullName
        id
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result.reviews;
};

export const postReview = async (businessId, rating, review, userFullName) => {
  const mutation = gql`
    mutation CreateReview {
      createReview(
        data: {
          businessList: { connect: { id: "${businessId}" } }
          rating: ${rating}
          review: "${review}"
          userFullName: "${userFullName}"
        }
      ) {
        id
        rating
        review
        userFullName
        createdBy {
          id
        }
      }
      publishManyReviews(to: PUBLISHED) {
        count
      }
    }
  `;
  const result = await request(MASTER_URL, mutation);
  return result.createReview;
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
  sendMessage,
  getMessagesByEmail,
  getReviews,
  postReview,
};
