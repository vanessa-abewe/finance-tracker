"use client";

import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { DatePicker } from "@nextui-org/react";
import { CalendarDate } from '@internationalized/date';
import axios from 'axios';

interface ReportRequestModalProps {
  visible: boolean;
  onClose: () => void;
}

const ReportRequestModal = ({ visible, onClose }: ReportRequestModalProps) => {
  const [startDate, setStartDate] = useState<CalendarDate | null>(null);
  const [endDate, setEndDate] = useState<CalendarDate | null>(null);
  const [format, setFormat] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateReport = async () => {
    if (!startDate || !endDate || !format) {
      alert("Please select a date range and format!");
      return;
    }

    try {
      setLoading(true);
      
      const jsStartDate = new Date(startDate.year, startDate.month - 1, startDate.day);
      const jsEndDate = new Date(endDate.year, endDate.month - 1, endDate.day);

      const response = await axios.post('/api/reports', {
        startDate: jsStartDate.toISOString(),
        endDate: jsEndDate.toISOString(),
        format,
      }, {
        responseType: 'blob',
      });

     
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `transactions_report.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      alert("Report generated successfully!");
    } catch (error) {
      console.error('Error generating report:', error);
      alert("Failed to generate the report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={visible}
      onClose={onClose}
      size="md"
      placement="center"
    >
      <ModalHeader>
        <h3 className="text-lg font-semibold">Request Report</h3>
      </ModalHeader>
      <ModalBody>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Start Date</label>
            <DatePicker
              value={startDate}
              onChange={setStartDate}
              classNames={{
                base: "w-full"
              }}
              label="Start Date"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">End Date</label>
            <DatePicker
              value={endDate}
              onChange={setEndDate}
              minValue={startDate || undefined}
              classNames={{
                base: "w-full"
              }}
              label="End Date"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Report Format</label>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="flat" className="w-full">
                  {format || "Select format"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu onAction={(key) => setFormat(key as string)}>
                <DropdownItem key="csv">CSV</DropdownItem>
                <DropdownItem key="pdf">PDF</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          color="danger"
          variant="light"
          onPress={onClose}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          onPress={handleGenerateReport}
          isLoading={loading}
        >
          Generate Report
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ReportRequestModal;