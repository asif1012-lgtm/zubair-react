import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Smartphone, Laptop, MessageSquare } from "lucide-react";

interface MobileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileModal({ open, onOpenChange }: MobileModalProps) {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/13322632043', '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-[#1877f2]">
            Please Use a Laptop/Computer
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4 text-center">
          <div className="flex justify-center space-x-4">
            <Smartphone className="w-8 h-8 text-red-500" />
            <Laptop className="w-8 h-8 text-green-500" />
          </div>
          <p className="text-[#65676B]">
            For the best experience and security, please use a laptop or computer to complete the verification process.
          </p>
          <div className="pt-4">
            <p className="text-sm text-[#65676B] mb-2">
              Don't have access to a computer?
            </p>
            <Button
              onClick={handleWhatsAppClick}
              className="bg-[#25D366] hover:bg-[#128C7E] text-white w-full"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Contact Our Agent on WhatsApp
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}