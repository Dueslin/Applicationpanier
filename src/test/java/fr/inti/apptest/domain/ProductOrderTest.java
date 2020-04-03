package fr.inti.apptest.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.inti.apptest.web.rest.TestUtil;

public class ProductOrderTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductOrder.class);
        ProductOrder productOrder1 = new ProductOrder();
        productOrder1.setId("id1");
        ProductOrder productOrder2 = new ProductOrder();
        productOrder2.setId(productOrder1.getId());
        assertThat(productOrder1).isEqualTo(productOrder2);
        productOrder2.setId("id2");
        assertThat(productOrder1).isNotEqualTo(productOrder2);
        productOrder1.setId(null);
        assertThat(productOrder1).isNotEqualTo(productOrder2);
    }
}
