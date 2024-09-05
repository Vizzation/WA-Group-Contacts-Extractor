function extractContacts() {
  let contacts = [];
  
  // Find all elements that might contain contact info
  document.querySelectorAll('div[role="button"]').forEach(contact => {
    // Adjust the selectors based on actual HTML structure
    let nameElement = contact.querySelector('span[title]');
    let numberElement = contact.querySelector('span[data-testid="phone-number"]');

    if (nameElement) {
      let name = nameElement.getAttribute('title') || "No Name";
      // If numberElement is not found, you might not be able to get phone numbers directly
      let number = numberElement ? numberElement.textContent : "No Number";
      contacts.push({ name: name, number: number });
    }
  });

  if (contacts.length > 0) {
    let csvContent = "data:text/csv;charset=utf-8," 
      + "Name,Number\n" 
      + contacts.map(e => e.name + "," + e.number).join("\n");

    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "whatsapp_contacts.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    alert("No contacts found or unable to extract contacts.");
  }
}

extractContacts();
