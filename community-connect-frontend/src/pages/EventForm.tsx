import React, { useState, useEffect } from 'react';

interface EventFormProps {
  start: Date;
  end: Date;
  onSubmit: (eventData: {
    title: string;
    description: string;
    date: Date;
    startTime: string;
    endTime: string;
  }) => void;
  onCancel: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ start, end, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<string>(start.toISOString().substring(0, 10));
  const [startTime, setStartTime] = useState<string>(start.toISOString().substring(11, 16));
  const [endTime, setEndTime] = useState<string>(end.toISOString().substring(11, 16));

  useEffect(() => {
    setDate(start.toISOString().substring(0, 10));
    setStartTime(start.toISOString().substring(11, 16));
    setEndTime(end.toISOString().substring(11, 16));
  }, [start, end]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const startDateTime = new Date(`${date}T${startTime}:00`);
    const endDateTime = new Date(`${date}T${endTime}:00`);

    if (endDateTime <= startDateTime) {
      alert('End time must be after the start time');
      return;
    }

    onSubmit({ title, description, date: new Date(date), startTime, endTime });
  };

  return (
    <div className="bg-white p-8 shadow-lg rounded-lg max-w-lg mx-auto mt-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Create Event</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-600 font-medium mb-2">Event Name</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter event title"
          />
        </div>
        <div>
          <label className="block text-gray-600 font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter event description"
          />
        </div>
        <div>
          <label className="block text-gray-600 font-medium mb-2">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 font-medium mb-2">Start Time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-2">End Time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
