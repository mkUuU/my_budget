import { jsPDF } from 'jspdf';
import { Document, Page, Text, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { Document as DocxDocument, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import PropTypes from 'prop-types';
import { Button } from "@/components/ui/button";

const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 24, marginBottom: 10 },
  text: { fontSize: 12, marginBottom: 5 },
});

const PDFStatement = ({ data, isGroup }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>{isGroup ? 'Group' : 'Individual'} Statement</Text>
      {Object.entries(data).map(([key, value]) => (
        <Text key={key} style={styles.text}>
          {key}: {value}
        </Text>
      ))}
    </Page>
  </Document>
);
PDFStatement.propTypes = {
  data: PropTypes.object.isRequired,
  isGroup: PropTypes.bool.isRequired,
};

const GenerateStatement = ({ data, isGroup }) => {
GenerateStatement.propTypes = {
  data: PropTypes.object.isRequired,
  isGroup: PropTypes.bool.isRequired,
};
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`${isGroup ? 'Group' : 'Individual'} Statement`, 10, 10);
    let yPos = 20;
    Object.entries(data).forEach(([key, value]) => {
      doc.text(`${key}: ${value}`, 10, yPos);
      yPos += 10;
    });
    doc.save(`${isGroup ? 'group' : 'individual'}_statement.pdf`);
  };

  const generateWord = () => {
    const doc = new DocxDocument({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: `${isGroup ? 'Group' : 'Individual'} Statement`,
                bold: true,
                size: 24,
              }),
            ],
          }),
          ...Object.entries(data).map(([key, value]) => 
            new Paragraph({
              children: [new TextRun({ text: `${key}: ${value}` })],
            })
          ),
        ],
      }],
    });

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, `${isGroup ? 'group' : 'individual'}_statement.docx`);
    });
  };

  return (
    <div className="space-x-2">
      <Button onClick={generatePDF}>Download PDF</Button>
      <Button onClick={generateWord}>Download Word</Button>
      <PDFDownloadLink document={<PDFStatement data={data} isGroup={isGroup} />} fileName={`${isGroup ? 'group' : 'individual'}_statement.pdf`}>
        {({ loading }) => 
          <Button disabled={loading}>
            {loading ? 'Loading document...' : 'Download PDF (React-PDF)'}
          </Button>
        }
      </PDFDownloadLink>
    </div>
  );
};

export default GenerateStatement;