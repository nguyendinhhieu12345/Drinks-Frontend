import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

interface PDFDocumentProps {
  invoiceContent: string;
}

const PDFDocument: React.FC<PDFDocumentProps> = ({ invoiceContent }) => {
  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Document>
        <Page size="A4">
          <View style={styles.page}>
            <Text>{invoiceContent}</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    padding: 10,
  },
});

export default PDFDocument;
