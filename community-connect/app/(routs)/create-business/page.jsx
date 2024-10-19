"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GlobalApi from "@/app/_services/GlobalApi";

// Validation Schema
const FormSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  about: z.string().min(1, { message: "About is required." }),
  address: z.string().min(1, { message: "Address is required." }),
  category: z.object({
    connect: z.object({
      id: z.string().min(1, { message: "Category is required." }),
    }),
  }),
  contactPerson: z.string().min(1, { message: "Contact Person is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  images: z
    .object({
      create: z.array(z.object({ url: z.string().url() })).optional(),
    })
    .optional(),
});

export function CreateBusiness() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await GlobalApi.getCategory();
        setCategories(res?.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      about: "",
      address: "",
      category: { connect: { id: "" } },
      contactPerson: "",
      email: "",
      images: { create: [] },
    },
  });

  const onSubmit = async (data) => {
    try {
      const { about, address, category, contactPerson, email, images, name } =
        data;

      // Log the submitted data
      console.log("Data being submitted:", data);
      console.log("Images being submitted:", images?.create);

      // Check category ID
      if (!category?.connect?.id) {
        throw new Error("Category ID is required");
      }

      // Ensure images.create is defined and is an array
      const imageUrls = Array.isArray(images?.create) ? images.create : [];
      if (imageUrls.length === 0) {
        throw new Error("At least one image URL is required");
      }

      // Validate image URLs
      for (const image of imageUrls) {
        if (!isValidUrl(image.url)) {
          throw new Error(`Invalid image URL: ${image.url}`);
        }
      }

      // Call the API to create the business
      const result = await GlobalApi.createBusiness({
        about,
        address,
        category: { connect: { id: category.connect.id } },
        contactPerson,
        email,
        images: { create: imageUrls },
        name,
      });

      console.log("API Response:", result);

      // Publish the images after creating the business
      await publishImages(result.id, imageUrls);

      toast.success("Business created and images published successfully");
      form.reset();
    } catch (error) {
      console.error("Error creating business:", error);
      toast.error(
        "Error creating business: " + (error.message || "Unknown error")
      );
    }
  };

  // Function to publish images
  const publishImages = async (businessId, imageUrls) => {
    GlobalApi.publishImages(businessId, imageUrls);
  };

  // URL validation function
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Create a Business</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Business Name */}
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <Input placeholder="Business Name" {...field} />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            {/* About */}
            <FormItem>
              <FormLabel>About</FormLabel>
              <FormControl>
                <Controller
                  name="about"
                  control={form.control}
                  render={({ field }) => (
                    <Textarea
                      placeholder="About the business"
                      {...field}
                      className="min-h-[120px]"
                    />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            {/* Address */}
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Controller
                  name="address"
                  control={form.control}
                  render={({ field }) => (
                    <Input placeholder="Business Address" {...field} />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            {/* Category Dropdown with Icons */}
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Controller
                  name="category.connect.id"
                  control={form.control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      placeholder="Select a category"
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.icon?.url && (
                              <img
                                src={category.icon.url}
                                alt={category.name}
                                className="w-6 h-6"
                              />
                            )}
                            <span>{category.name}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            {/* Contact Person */}
            <FormItem>
              <FormLabel>Contact Person</FormLabel>
              <FormControl>
                <Controller
                  name="contactPerson"
                  control={form.control}
                  render={({ field }) => (
                    <Input placeholder="Contact Person" {...field} />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            {/* Email */}
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <Input placeholder="Email" {...field} />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            {/* Images */}
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <Controller
                  name="images.create"
                  control={form.control}
                  render={({ field }) => (
                    <Input
                      placeholder="Image URLs (comma separated)"
                      onChange={(e) => {
                        // Split the input string by commas, trim whitespace, and filter out empty entries
                        const urls = e.target.value
                          .split(",")
                          .map((url) => url.trim())
                          .filter((url) => url !== ""); // Ensure no empty strings are added

                        // Convert the URLs into the desired format
                        const formattedUrls = urls.map((url) => ({ url }));

                        // Update the field value
                        field.onChange(formattedUrls);
                      }}
                    />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            {/* Submit Button */}
            <Button type="submit" className="w-full sm:w-auto mt-6">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default CreateBusiness;
