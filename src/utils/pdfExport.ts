
import { jsPDF } from "jspdf";
import { Note } from "@/types/noteTypes";
import { format } from "date-fns";

export const generatePDF = (notes: Note[]): string => {
  const doc = new jsPDF();
  let yPosition = 20;
  
  // Add title
  doc.setFontSize(18);
  doc.text("Daily Notes Export", 20, yPosition);
  yPosition += 10;
  
  doc.setFontSize(12);
  doc.text(`Generated on: ${format(new Date(), 'MMMM d, yyyy')}`, 20, yPosition);
  yPosition += 20;

  // Group notes by date
  const groupedNotes = notes.reduce((groups, note) => {
    const date = format(new Date(note.createdAt), 'yyyy-MM-dd');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(note);
    return groups;
  }, {} as Record<string, typeof notes>);

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedNotes).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  // Write notes to PDF
  for (const date of sortedDates) {
    // Add date header
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text(format(new Date(date), 'EEEE, MMMM d, yyyy'), 20, yPosition);
    yPosition += 10;
    
    // Add notes for this date
    for (const note of groupedNotes[date]) {
      // Add note title
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text(note.title, 20, yPosition);
      yPosition += 7;
      
      // Add note content
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');

      // Split long text into multiple lines
      const contentLines = doc.splitTextToSize(note.content, 170);
      if (yPosition + contentLines.length * 5 > 280) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.text(contentLines, 20, yPosition);
      yPosition += contentLines.length * 5 + 10;
      
      // Add a divider
      doc.setDrawColor(200, 200, 200);
      doc.line(20, yPosition - 5, 190, yPosition - 5);
      
      // Check if we need a new page
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
    }
  }
  
  // Generate PDF
  const pdfOutput = doc.output('datauristring');
  return pdfOutput;
};
