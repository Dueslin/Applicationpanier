package fr.inti.apptest.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.inti.apptest.web.rest.TestUtil;

public class ProductdetailsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Productdetails.class);
        Productdetails productdetails1 = new Productdetails();
        productdetails1.setId("id1");
        Productdetails productdetails2 = new Productdetails();
        productdetails2.setId(productdetails1.getId());
        assertThat(productdetails1).isEqualTo(productdetails2);
        productdetails2.setId("id2");
        assertThat(productdetails1).isNotEqualTo(productdetails2);
        productdetails1.setId(null);
        assertThat(productdetails1).isNotEqualTo(productdetails2);
    }
}
