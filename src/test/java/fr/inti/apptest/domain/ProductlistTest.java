package fr.inti.apptest.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.inti.apptest.web.rest.TestUtil;

public class ProductlistTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Productlist.class);
        Productlist productlist1 = new Productlist();
        productlist1.setId("id1");
        Productlist productlist2 = new Productlist();
        productlist2.setId(productlist1.getId());
        assertThat(productlist1).isEqualTo(productlist2);
        productlist2.setId("id2");
        assertThat(productlist1).isNotEqualTo(productlist2);
        productlist1.setId(null);
        assertThat(productlist1).isNotEqualTo(productlist2);
    }
}
